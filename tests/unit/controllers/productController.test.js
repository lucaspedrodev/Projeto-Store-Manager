const chai = require('chai');
const sinonChai = require('sinon-chai');
const sinon = require('sinon');
const productsMock = require('../controllers/productControllerMock');
const productsModel = require("../../../src/models/productModel");
const productsService = require("../../../src/services/productService");
const productsController = require("../../../src/controllers/productController");

chai.use(sinonChai);
const { expect } = chai;

describe('Testa productsController', function () {
  describe('testa se retorna todos os produtos', function () {
    const req = {};
    const res = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => {
      sinon.restore();
    });

    it('testa se retorna o status 200 e todos os produtos', async function () {
      sinon.stub(productsService, "allProducts").resolves(productsMock.allProducts);

      await productsController.allProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWithExactly(productsMock.allProducts);
    });
  });

  describe("Testa productById", function () {
    const req = {};
    const res = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => {
      sinon.restore();
    });

    it("Testa se retorna o produto pelo seu id com o status 200", async function () {
      req.params = { id: 1 };

      sinon.stub(productsService, "productById").resolves(productsMock.allProducts[0]);

      await productsController.productById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWithExactly(
        productsMock.allProducts[0]
      );
    });

    it('Testa se retorna o status 404 e a message "Product not found"', async function () {
      req.params = { id: 7 };

      sinon.stub(productsService, "productById").resolves({ message: "Product not found", });

      await productsController.productById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWithExactly({ message: "Product not found", });
    });
  });


  describe('Testa productRegistration', function () {
    describe('testa se registra um novo produto', function () {
      const req = {};
      const res = {};

      beforeEach(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
      });

      afterEach(() => {
        sinon.restore();
      });

      it('testa se retorna o status 201 e se registra um novo produto', async function () {
        req.body = {
          id: 3,
          name: "suco de uva"
        }
        
        const newProduct = { id: 3, ...req.body }

        sinon.stub(productsService, "productRegistration").resolves(newProduct);

        await productsController.productRegistration(req, res);

        expect(res.status).to.be.calledWith(201)
        expect(res.json).to.be.calledWith(newProduct)
      });
    });
  });

  describe('Testa updateProducts', function () {
    describe('testa se atualiza um produto', function () {
      const req = {};
      const res = {};

      beforeEach(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
      });

      afterEach(() => {
        sinon.restore();
      });

      it('testa se retorna o status 404 e a message Product Not Found', async function () {
        req.body = { name: "suco de laranja" };
        req.params = { id: 7 };

        sinon.stub(productsService, "updateProducts").resolves(false);

        await productsController.updateProducts(req, res);

        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWithExactly({
          message: "Product not found",
        });
      });

      it('testa se retorna o status 200 e se atualiza o produto', async function () {
        req.body = { name: "suco de groselha" };
        req.params = { id: 2 };

        const updatProduct = { id: 2, ...req.body };

        sinon.stub(productsService, "updateProducts").resolves(updatProduct);

        await productsController.updateProducts(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWithExactly(updatProduct);
      });
    });
  });
  
  describe('testa deleteProducts', function () {
    describe('testa se deleta um produto ', function () {
      const req = {};
      const res = {};

      beforeEach(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        res.end = sinon.stub().returns(res);
      });

      afterEach(() => {
        sinon.restore();
      });

      it('testa se deleta um produto', async function () {
        req.params = 1;

        sinon.stub(productsService, 'deleteProducts').resolves({ type: 204 });


        await productsController.deleteProducts(req, res)

        expect(res.type).to.equal(undefined);
      })
    })
  })     
});