const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require("sinon-chai");
const { expect } = chai;
const { afterEach } = require('mocha');
const productsModel = require("../../../src/models/productModel");
const productsService = require("../../../src/services/productService");
const productsMock = require('../../../tests/unit/services/productServiceMock');


describe('Testa productsService', function () {
  describe('Testa allProducts', function () {
    afterEach(() => {
      sinon.restore();
    });
  });

  it('testa se retorna todos os produtos', async function () {
    sinon.stub(productsModel, 'allProducts').resolves(productsMock.allProducts);

    const result = await productsService.allProducts();

    expect(result).to.be.deep.equal(productsMock.allProducts);
  })

  it('testa se ao falhar o retorno de todos os produtos mostra a mensagem Product Not Found', async function () {
    sinon.stub(productsModel, 'allProducts').resolves(undefined);

    const result = await productsService.allProducts();

    expect(result).to.be.deep.equal({ message: 'Product not found' });
  })

  describe('Testa productById', function () {
    afterEach(() => {
      sinon.restore();
    });
  });

  it('testa se retorna um produto de acordo com seu Id', async function () {
    sinon.stub(productsModel, 'productById').resolves(productsMock.allProducts[0]);

    const id = 1
    const result = await productsService.productById(id);

    expect(result).to.be.deep.equal(productsMock.allProducts[0]);
  })

  it('testa se ao falhar o retorno de um produto de acordo com seu Id, retorna a mensagem Product not Found', async function () {
    sinon.stub(productsModel, 'productById').resolves(undefined);

    const id = 1
    const result = await productsService.productById(id);

    expect(result).to.be.deep.equal({ message: 'Product not found' });
  })

  describe('Testa productRegistration', function () {
    afterEach(() => {
      sinon.restore();
    });
  });

  it('testa se registra um produto corretamente', async function () {
    sinon.stub(productsModel, 'productRegistration').resolves(productsMock.allProducts[0].id);

    const result = await productsService.productRegistration(productsMock.newProduct);

    expect(result).to.be.deep.equal(productsMock.allProducts[0].id);
  })

  describe('Testa productUpdate', function () {
    afterEach(() => {
      sinon.restore();
    });
  });

  it('testa se atualiza um produto corretamente', async function () {
    sinon.stub(productsModel, 'updateProducts').resolves(productsMock.updateProducts);
    const id = productsMock.allProducts[0].id;
    const product = productsMock.newProduct;
    const result = await productsService.updateProducts(id, product);

    expect(result).to.be.deep.equal(productsMock.updateProducts);
  })
  afterEach(() => {
    sinon.restore();
  });

  it('testa se ao falhar na atualização, mostra a mensagem "product not found', async function () {
    sinon.stub(productsModel, 'updateProducts').resolves(productsService.updateProducts().message);
    const id = productsMock.allProducts[0].id;
    const product = productsMock.newProduct;
    const result = await productsService.updateProducts(id, product);

    expect(result).to.be.deep.equal('Product not found');
  })

  describe('Testa deleteProducts', function () {
    afterEach(() => {
      sinon.restore();
    });
  });

  it('testa se deleta um produto ', async function () {
    sinon.stub(productsModel, 'productById').resolves({})
    sinon.stub(productsModel, 'deleteProducts').resolves(undefined);
    const id = 2;
    
    const result = await productsService.deleteProducts(id);

    expect(result).to.be.deep.equal({ type: null, message: '' });
  })

  it('testa se mostra a mensagem Product Not Found ao falhar o delete de um produto ', async function () {
    sinon.stub(productsModel, 'productById').resolves(undefined)
    const id = 980;

    const result = await productsService.deleteProducts(id);

    expect(result).to.be.deep.equal({ type: 404, message: 'Product not found' });
  })

})