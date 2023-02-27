const chai = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const productsMock = require('../../../tests/unit/models/productModelMock');
const { expect } = chai;
const { afterEach } = require('mocha');
const productsModel = require("../../../src/models/productModel");


describe('Testa productsModel', () => {
  describe('Testa allProducts', () => {
    afterEach(() => {
      sinon.restore();
    })

    it('Testa se retorna todos os produtos', async () => {
      // arrange
      sinon.stub(connection, 'execute').resolves([productsMock.allProducts])
      //act
      const result = await productsModel.allProducts();
      //assert
      expect(result).to.be.deep.equal(productsMock.allProducts);
    });
  });

  describe('Testa productById', () => {
    afterEach(() => {
      sinon.restore();
    })
    it('Testa se retorna um produto pelo seu ID', async () => {
      //arrange
      sinon.stub(connection, 'execute').resolves([[productsMock.allProducts[0]]])
      //act
      const result = await productsModel.productById(1);
      //assert
      expect(result).to.be.deep.equal({ id: 1, name: 'Martelo de Thor' });
    })
  })

  describe('Testa productRegistration', () => {
    afterEach(() => {
      sinon.restore();
    })
    it('Testa se é possivel registrar um novo produto', async () => {
      //arrange
      sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
      //act
      const result = await productsModel.productRegistration(productsMock.productRegistration);
      //assert
      expect(result).to.be.equal(4);
    })
  })

  describe('Testa updateProducts', () => {
    afterEach(() => {
      sinon.restore();
    })
    it('testa se atualiza um produto', async () => {
      //arrange
      const id = 1;
      const name = productsMock.productUpdate.name;
      sinon.stub(connection, 'execute').resolves([{ updateRows: 1 }]);
      //act 
      const result = await productsModel.updateProducts(id, name);
      //assert
      expect(result).to.be.deep.equal(1);
    })
  })

  describe('Testa deleteProducts ', function () {
    afterEach(() => {
      sinon.restore();
    })
    it('Faz a remoção de um produto com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves();
      const id = 1;
      const response = await productsModel.deleteProducts(id);

      expect(response).to.be.undefined;
    });
  });
  
});