import "./App.css";
import React from "react";
import ModalCreate from "./components/ModalCreate";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      sisaUang: 0,
      perSantaseUang: 0,
      pemasukanUang: 0,
      pengeluaranUnag: 0,
      transaksiIN: 0,
      transaksiOUT: 0,
      summary: [
        // {
        //   deskripsi: "Menerima Gaji",
        //   tanggal: "1 July 2022",
        //   nominal: 10000,
        //   category: "IN",
        // },
        // {
        //   deskripsi: "Menerima Gaji 3",
        //   tanggal: "1 July 2022",
        //   nominal: 30000,
        //   category: "IN",
        // },
        // {
        //   deskripsi: "Makan Nasi Padang",
        //   tanggal: "2 July 2022",
        //   nominal: 20000,
        //   category: "OUT",
        // },
      ],
    };

    this.tambahItem = this.tambahItem.bind(this);
    this.Hitung = this.Hitung.bind(this);
  }

  tambahItem(objek) {
    let newData = [...this.state.summary, objek];

    let dataUangIN = newData.filter((item) => item.category === "IN");
    let nominalUang = dataUangIN.map((item) => item.nominal);
    let jumlahUangIN = nominalUang.reduce((total, num) => total + num, 0);

    let dataUangOUT = newData.filter((item) => item.category === "OUT");
    let nominalUangOUT = dataUangOUT.map((item) => item.nominal);
    let jumlahUangOUT = nominalUangOUT.reduce((total, num) => total + num, 0);
    this.setState({
      pemasukanUang: jumlahUangIN,
      pengeluaranUnag: jumlahUangOUT,
      transaksiIN: nominalUang.length,
      transaksiOUT: nominalUangOUT.length,
      sisaUang: jumlahUangIN - jumlahUangOUT,
      perSantaseUang: ((jumlahUangIN - jumlahUangOUT) / jumlahUangIN) * 100,
      summary: newData,
    });
  }

  Hitung() {
    let dataUangIN = this.state.summary.filter((item) => item.category === "IN");
    let nominalUang = dataUangIN.map((item) => item.nominal);
    let jumlahUangIN = nominalUang.reduce((total, num) => total + num);

    let dataUangOUT = this.state.summary.filter((item) => item.category === "OUT");
    let nominalUangOUT = dataUangOUT.map((item) => item.nominal);
    let jumlahUangOUT = nominalUangOUT.reduce((total, num) => total + num);
    this.setState({
      pemasukanUang: jumlahUangIN,
      pengeluaranUnag: jumlahUangOUT,
      transaksiIN: nominalUang.length,
      transaksiOUT: nominalUangOUT.length,
      sisaUang: jumlahUangIN - jumlahUangOUT,
      perSantaseUang: ((jumlahUangIN - jumlahUangOUT) / jumlahUangIN) * 100,
    });
  }

  componentDidMount() {
    if (this.state.summary.length < 1) {
      console.log("ok");
    } else {
      this.Hitung();
    }
  }

  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h1 className="fw-bold">FEEDUITEN APPS</h1>
              <hr className="w-75 mx-auto" />
              <h2 className="fw-bold"> Rp. {this.state.sisaUang} </h2>
              <span className="title-md"> Sisa uang kamu tersisa {this.state.perSantaseUang} % lagi </span>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-6">
              <div className="card-wrapper p-4">
                <div className="icon-wrapper mb-1">
                  <i className="bi bi-wallet2"></i>
                </div>
                <span className="title-sm">Pemasukan</span>
                <h3 className="fw-bold">Rp.{this.state.pemasukanUang},-</h3>
                <div>
                  <span className="title-sm text-ungu fw-bolder">{this.state.transaksiIN} </span>
                  <span className="title-sm">Transaksi</span>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="card-wrapper p-4">
                <div className="icon-wrapper mb-1">
                  <i className="bi bi-cash-stack"></i>
                </div>
                <span className="title-sm">Pengeluaran</span>
                <h3 className="fw-bold">Rp.{this.state.pengeluaranUnag},-</h3>
                <div>
                  <span className="title-sm text-ungu fw-bolder">{this.state.transaksiOUT} </span>
                  <span className="title-sm">Transaksi</span>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-12 d-flex justify-content-between align-items-center">
              <h4 className="fw-bolder">Ringkasan Transaksi</h4>
              <div className="wrapper-button d-flex">
                <ModalCreate action={this.tambahItem} category="IN" variant="button btn-ungu px-3 py-2 me-2" text="Pemasukan" icon="bi bi-plus-square" modalHeading="Tambahkan Pemasukan" />
                <ModalCreate action={this.tambahItem} category="OUT" variant="button btn-pink px-3 py-2" text="Pengeluaran" icon="bi bi-dash-circle-fill" modalHeading="Tambahkan Pengeluaran" />
              </div>
            </div>
          </div>

          <div className="row mt-4">
             { this.state.summary.length < 1 && <Alert />} 
            
            {this.state.summary.map((sum, index) => {
              return (
                <div key={index} className="mb-4 col-12 d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <div className={sum.category === "IN" ? "icon-wrapper-in" : "icon-wrapper-out"}>
                      <i className={sum.category === "IN" ? "bi bi-wallet2" : "bi bi-bag-dash"}></i>
                    </div>
                    <div className="transaction ms-2 d-flex flex-column">
                      <h6>{sum.deskripsi}</h6>
                      <span className="title-sm">{sum.tanggal}</span>
                    </div>
                  </div>
                  {/* <h5 className="money money-in"> Rp.{sum.nominal}</h5> */}
                  <h5 className={sum.category === "IN" ? "money-in" : "money-out"}> Rp.{sum.nominal}</h5>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

class Alert extends React.Component {
  constructor() {
    super();
  }

  render() {
    return <h1>Data Masih Kosong</h1>;
  }
}

export default App;
