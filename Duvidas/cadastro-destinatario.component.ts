import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Snackbar} from "../../../../../../util/snackbar";
import {ErrorUtil} from "../../../../../../util/error";
import {CnpjValidator, CpfValidator} from "../../../../../../util/customValidators/cpfCnpjValidator";
import {PessoaFiscalDTO} from "../../../../../../model/dto/PessoaFiscalDTO";
import {ImovelDTO} from "../../../../../../model/dto/ImovelDTO";
import {HttpErrorResponse} from "@angular/common/http";
import {Dialog} from "../../../../../../model/Dialog";
import {BasicAlertComponent} from "../../../../../shared/alert/basic-alert/basic-alert.component";
import {take, takeUntil} from "rxjs/operators";
import {Country} from "../../../../../../model/basicos/Country";
import {PropertyProvider} from "../../../../../../providers/company/property/property";
import {MemberProvider} from "../../../../../../providers/company/member/member";
import {MatDialog} from "@angular/material/dialog";
import {EstadosMunicipiosUtil} from "../../../../../../util/estados-municipios";
import {ReplaySubject, Subject} from "rxjs";
import {Estate} from "../../../../../../model/basicos/Estate";
import {City} from "../../../../../../model/basicos/City";
import {Imovel} from "../../../../../../model/Imovel";
import {MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";


@Component({
  selector: 'app-cadastro-destinatario',
  templateUrl: './cadastro-destinatario.component.html',
  styleUrls: ['./cadastro-destinatario.component.scss']
})
export class CadastroDestinatarioComponent implements OnInit {

  @ViewChild('triggerCountry', {static: false}) triggerCountry: MatAutocompleteTrigger;
  @ViewChild('triggerCity', {static: false}) triggerCity: MatAutocompleteTrigger;
  @ViewChild('triggerState', {static: false}) triggerState: MatAutocompleteTrigger;
  @ViewChild('citySelect', {static: true}) citySelect: MatSelect;
  @ViewChild('stateSelect', {static: true}) stateSelect: MatSelect;
  @ViewChild('countrySelect', {static: true}) countrySelect: MatSelect;
  @Input() enableClearOnEscapePressed = true;
  @Input() public imovelExistente;
  @Input() public destinatarioExistente;

  public destinatario: Destinatario;
  public destinatarioAux: Destinatario = new Destinatario();
  public editar: boolean = false;
  public destinatarioForm: FormGroup;
  public enviado: boolean = false;
  public enviando: boolean = false;
  public showIE: boolean = false;
  public imovel: ImovelDTO = new ImovelDTO();
  public imovelAux: Imovel = new Imovel();
  public codImovel: string;
  public municipioId: number;
  public properties: ImovelDTO[];
  public members: any[];
  public membersClone: any[];
  public i: number;

  public countrys: Country[] = this.estadosMunicipiosUtil.paises;
  public countryFilterCtrl: FormControl = new FormControl();
  public filteredCountrys: ReplaySubject<Country[]> = new ReplaySubject<Country[]>(1);
  public states: Estate[] = this.estadosMunicipiosUtil.estados;
  public stateFilterCtrl: FormControl = new FormControl();
  public filteredStates: ReplaySubject<Estate[]> = new ReplaySubject<Estate[]>(1);
  public cities: City[] = this.estadosMunicipiosUtil.cidades;
  public cityFilterCtrl: FormControl = new FormControl();
  public filteredCities: ReplaySubject<City[]> = new ReplaySubject<City[]>(1);
  protected _onDestroyCountry = new Subject<void>();
  protected _onDestroyState = new Subject<void>();
  protected _onDestroyCity = new Subject<void>();

  constructor(public activeModal: NgbActiveModal,
              public snackbar: Snackbar,
              public erroUtil: ErrorUtil,
              public fb: FormBuilder,
              private propertyProvider: PropertyProvider,
              public modalService: NgbModal,
              public dialog: MatDialog,
              public errorUtil: ErrorUtil,
              public estadosMunicipiosUtil: EstadosMunicipiosUtil) {

  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroyCountry.next();
    this._onDestroyCountry.complete();
    this._onDestroyState.next();
    this._onDestroyState.complete();
    this._onDestroyCity.next();
    this._onDestroyCity.complete();
  }

  configCountry() {
    this.estadosMunicipiosUtil.setCountry();
    this.countrys = this.estadosMunicipiosUtil.paises;
    this.filteredCountrys.next(this.countrys.slice());
    this.countryFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroyCountry))
      .subscribe(() => {
        this.filterCountrys();
      });
  }

  configState() {
    this.estadosMunicipiosUtil.setState();
    this.states = this.estadosMunicipiosUtil.estados;
    this.filteredStates.next(this.states.slice());
    this.stateFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroyState))
      .subscribe(() => {
        this.filterStates();
      });
  }

  configCity() {
    this.cities = this.estadosMunicipiosUtil.cidades;

    this.filteredCities.next(this.cities.slice());
    this.cityFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroyCity))
      .subscribe(() => {
        this.filterCities();
      });
  }

  filterCities() {
    if (!this.cities) {
      return;
    }
    // get the search keyword
    let search = this.cityFilterCtrl.value;
    if (!search) {
      this.filteredCities.next(this.cities.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the countrys
    this.filteredCities.next(
      this.cities.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
    );
  }

  filterStates() {
    if (!this.states) {
      return;
    }
    // get the search keyword
    let search = this.stateFilterCtrl.value;
    if (!search) {
      this.filteredStates.next(this.states.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the countrys
    this.filteredStates.next(
      this.states.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
    );
  }

  filterCountrys() {
    if (!this.countrys) {
      return;
    }
    // get the search keyword
    let search = this.countryFilterCtrl.value;
    if (!search) {
      this.filteredCountrys.next(this.countrys.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the countrys
    this.filteredCountrys.next(
      this.countrys.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
    );
  }

  ngOnInit() {
    this.destinatarioForm = this.fb.group({
      name: ['', Validators.required],
      cpfCNPJ: ['', Validators.compose( [Validators.required, CnpjValidator, CpfValidator])],
      telephone: [''],
      email: [''],
    });

    this.imovelForm = this.fb.group({
      nome: ['', Validators.required],
      codigo: ['', Validators.required],
      pais: [''],
      estado: [''],
      municipio: [''],
      codItr: [''],
      neighborhood: [''],
      cep: [''],
      street: [''],
      exploracao: ['0', Validators.required],
      ie: ['', Validators.required],
      tpIE: ['', Validators.required],
      showIE: [true],
    });

    this.configCountry();
    this.configState();

    if (this.imovelExistente != undefined) {
      Object.assign(this.imovel, this.imovelExistente);
      this.imovel = {...this.imovelExistente};
      this.parseDTO();
      this.editar = true;
    } else {
      this.newEndereco();
      this.imovelForm.controls.pais.setValue({id: 32, name: "Brasil", abbreviation: "BR"});
      this.getCountryId();
    }
  }


  parseDTO() {
    this.imovelForm.controls.nome.setValue(this.imovel.name);
    this.imovelForm.controls.codigo.setValue(this.imovel.propertyCode);
    this.imovelForm.controls.currency.setValue(this.imovel.currency);
    this.imovelForm.controls.pais.setValue(this.imovel.address.countryDTORespComp);
    this.imovelForm.controls.neighborhood.setValue(this.imovel.address.neighborhood);
    this.imovelForm.controls.codItr.setValue(this.imovel.itrCode);
    this.imovelForm.controls.cep.setValue(this.imovel.address.cep);
    this.imovelForm.controls.street.setValue(this.imovel.address.street);
    this.imovelAux.houseNumber = this.imovel.address.houseNumber;
    this.imovelAux.complement = this.imovel.address.complement;
    this.imovelAux.countryId = this.imovel.address.countryDTORespComp.id;
    if (this.imovelAux.countryId == 32 && this.imovel.address.countryDTORespComp.stateDTORespComp != undefined) {
      if (this.imovel.address.countryDTORespComp.stateDTORespComp.id != undefined) {
        this.estadosMunicipiosUtil.setCity(this.imovel.address.countryDTORespComp.stateDTORespComp.id);
        this.configCity();
        this.imovelForm.controls.estado.setValue(this.imovel.address.countryDTORespComp.stateDTORespComp);
        this.imovelForm.controls.municipio.setValue(this.imovel.address.countryDTORespComp.stateDTORespComp.cityDTORespComp);
      }
    }
  }

  getCountryId() {
    this.imovelAux.countryId = this.imovelForm.controls.pais.value.id;
  }

  getStateId() {
    this.imovelAux.stateId = this.imovelForm.controls.estado.value.id;
    this.estadosMunicipiosUtil.setCity(this.imovelForm.controls.estado.value.id);
    this.configCity();
  }

  setImovelForm() {
    if (this.imovelAux.countryId == 32) {
      this.imovelForm.controls.cep.setValidators([Validators.required]);
    } else {
      this.imovelForm.controls.cep.clearValidators();
    }
    this.imovelAux.cep = this.imovelForm.controls.cep.value;
    this.imovelAux.name = this.imovelForm.controls.nome.value;
    this.imovelAux.neighborhood = this.imovelForm.controls.neighborhood.value;
    this.imovelAux.street = this.imovelForm.controls.street.value;
    this.imovelAux.countryId = this.imovelForm.controls.pais.value.id;
    if (this.imovelForm.controls.pais.value.id == 32) {
      this.imovelAux.cityId = this.imovelForm.controls.municipio.value.id;
      this.imovelAux.stateId = this.imovelForm.controls.estado.value.id
    }
  }

  setEditedObject(imovel: ImovelDTO) {
    this.imovelExistente.propertyCode = imovel.propertyCode;
    this.imovelExistente.name = imovel.name;
    this.imovelExistente.currency = imovel.currency;
    this.imovelExistente.itrCode = imovel.itrCode;
    this.imovelExistente.address = imovel.address;
  }

  novoImovel() {
    this.enviando = true;
    this.setImovelForm();
    if (this.imovelForm.valid) {
      this.postProperty(this.imovelAux);
    } else {
      this.enviando = false;
      this.enviado = true;
      this.snackbar.openLong("Há erros no formulário. Confira antes de tentar enviar novamente!", 'erro');
    }
  }

  afterPostAndPutImovel(closeParameter, imovel, editMode: boolean) {
    if (editMode) {
      this.snackbar.openLong("Sucesso! " + imovel.name + " editado com sucesso!", 'success');
      this.setEditedObject(imovel);
    } else {
      this.snackbar.openLong("Sucesso! " + imovel.name + " inserido com sucesso!", 'success');}
    this.activeModal.close(closeParameter);
  }

  editarImovel() {
    this.enviando = true;
    this.setImovelForm();
    if (this.imovelForm.valid) {
      if (this.codImovel != this.imovelAux.propertyCode) {
        this.imovelAux.newerPropertyCode = this.imovelAux.propertyCode;
        this.imovelAux.propertyCode = this.codImovel;
        this.putProperty(this.imovelAux);
      } else {
        this.putProperty(this.imovelAux);
      }
    } else {
      this.enviado = true;
      this.enviando = false;
      this.snackbar.openLong("Há erros no formulário. Confira antes de tentar enviar novamente!", 'erro');
    }
  }


  postProperty(imovel) {
    this.propertyProvider.postProperty(imovel).then((imovelPost: ImovelDTO) => {
      this.afterPostAndPutImovel(imovelPost, imovelPost, false);
    }).catch((error: HttpErrorResponse) => {
      console.error(error);
      this.enviando = false;
      this.snackbar.openLong("Erro ao inserir imóvel! " + this.errorUtil.checkErrorStatus(error, error.status, error.error, 'property'), 'erro');
    });
  }

  putProperty(property) {
    this.propertyProvider.putProperty(property).then((imovelPut: ImovelDTO) => {
      this.afterPostAndPutImovel(this.municipioId, imovelPut, true);
    }).catch((error: HttpErrorResponse) => {
      this.enviando = false;
      this.snackbar.openLong(this.errorUtil.checkErrorStatus(error, error.status, error.error, 'property'), 'erro');
    });
  }

  protected setInitialValue() {

    this.filteredCountrys
      .pipe(take(1), takeUntil(this._onDestroyCountry))
      .subscribe(() => {
        this.countrySelect.compareWith = (a: Country, b: Country) => a && b && a.id === b.id;
      });

    if (this.editar) {

      this.filteredStates
        .pipe(take(1), takeUntil(this._onDestroyState))
        .subscribe(() => {
          this.stateSelect.compareWith = (a: Country, b: Country) => a && b && a.id === b.id;
        });

      this.filteredCities
        .pipe(take(1), takeUntil(this._onDestroyCity))
        .subscribe(() => {
          this.citySelect.compareWith = (a: Country, b: Country) => a && b && a.id === b.id;
        });

    }

  }

  editDestinatario(){

  }
  newDestinatario(){

  }

  updateState(){
    if(this.showIE == false) {
      this.showIE = true;
    } else {
      this.showIE = false;
    }
  }

  public enderecos = new FormArray([]);
  public imovelForm: FormGroup;

  newEndereco() {
    try {
      const imovelForm = new FormGroup({
        id: new FormControl(undefined),
        street: new FormControl(''),
        houseNumber: new FormControl(''),
        neighborhood: new FormControl(''),
        complement: new FormControl(''),
        cep: new FormControl(''),
        pais: new FormControl(''),
        estado: new FormControl(''),
        municipio: new FormControl(''),
        ie: new FormControl({value: '', disabled: false}),
        tpIE: new FormControl ({value: '', disabled: true}),
      })
      this.enderecos.push(imovelForm);
    }  catch (error) {
      console.error(error);
    }

  }

  deleteEndereco(a: number, endereco: any){
    try{
      this.enderecoExclusao.push(endereco);
      this.enderecos.removeAt(a);
    }  catch (error) {
      console.error(error);
    }
  }

  private enderecoExclusao: Imovel[] = [];

}

export class Destinatario{
  cpfCNPJ: number;
  name: string;
  ie: number;
  telephone: number;
  email: string;
  default: boolean;
}
