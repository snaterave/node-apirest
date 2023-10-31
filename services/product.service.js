const {faker} = require('@faker-js/faker');
//import { faker } from '@faker-js/faker';
const boom = require('@hapi/boom');

class ProductsService{
  constructor(){
    this.products = [];
    this.generate();
  }

  generate(){
    const limit = 100;

    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: +(faker.commerce.price()),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean() // booleano aleatorio
      })

    }
  }

  async create(data){
    const newProduct = {
      id: faker.string.uuid(),
      ...data
    }
    this.products.push(newProduct);

    return newProduct;
  }

  async find(){
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve(this.products);
      },5000)
    });
  }

  async findOne(id){
   //const name = this.getTotal(); // forzar un error y dispare el middleware
    const product =  this.products.find(item => item.id === id);
    if(!product) throw boom.notFound('product not found modificado');

    if(product.isBlock) throw boom.conflict('product is block');
    return product;
  }

  async update(id,data){
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      //throw new Error('product not found');
      throw boom.notFound('product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...data
    };
    return this.products[index];
  }

  async delete(id){
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      //throw new Error('product not found');
      throw boom.notFound('product not found');
    }
    this.products.splice(index,1);
    return { id };
  }
}

module.exports = ProductsService;
