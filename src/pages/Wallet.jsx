import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <div
          className="bg-orange-500 flex absolute min-h-screen w-1/5
      left-0 top-0 flex-col justify-center items-center"
        >
          <Header />
          <WalletForm />
          <h1 className="text-sm text-white bottom-2 absolute">by ronaldoCerenza</h1>
        </div>
        <Table />
      </div>
    );
  }
}

export default Wallet;
