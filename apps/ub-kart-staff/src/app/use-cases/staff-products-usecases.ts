import { Injectable } from "@nestjs/common";
import { CreateProductDto, IDataServices, Product, SellerProductRelation, User } from "@ub-kart/core";
import { StaffProductsFactoryService } from "./staff-products-factory.service";


@Injectable()
export class StaffProductsUseCases {
    constructor(
        private staffProductsFactoryService: StaffProductsFactoryService,
        private dataService: IDataServices,
    ) {}

    async create(user: User, createProductDto: CreateProductDto) {
        const newProduct = this.staffProductsFactoryService.createNewProduct(
            user, createProductDto
        );
         // to;do - add verify user role admin/seller   
        let createdProduct: Product;
        let createdSellerProductRelation: SellerProductRelation
        try {
            createdProduct = await this.dataService.products.create(newProduct);
            const newRelation = this.staffProductsFactoryService.createNewSellerProductRelation(newProduct.seller, createdProduct.sku);
            createdSellerProductRelation = await this.dataService.sellerProductRelations.create(newRelation);
            return createdProduct;
        } catch(e) {
            console.log(e);
            throw e;
        }
    }

    async getBySeller(seller_id: string) {
        const seller = this.staffProductsFactoryService.parseId(seller_id);
        const res = await this.dataService.sellerProductRelations.getAllByQuery({seller: seller});
        const productIds = res.map(entry => entry.product);
        return productIds;
    }

    async getAllDiscounts(){
        const response = {};
        response['codes'] = [];
        response['total_discount'] = 0;

        const discounts = await this.dataService.vouchers.getAllByQuery({});
        for (const entry of discounts) {
            const voucher = {};
            voucher['code'] = entry.code;
            voucher['redeemed_by'] = entry.user_id;
            voucher['redeemed_on'] = entry.created_at; 
            voucher['discount'] = entry.discount;
            response['codes'].push(voucher);
            response['total_discount'] += entry.discount;
            
        }

        return response;
    }

    async getAllSales() {
        const response = {};
        response['items_sold'] = 0;
        response['amount_sales'] = 0;

        const sales = await this.dataService.orders.getAllByQuery({});
        for (const entry of sales) {
            response['amount_sales'] += entry.total;
            if(entry.products!=null){
                entry.products.forEach((product)=>{
                    response['items_sold'] += Object.values(product)[0];
                });
            }
        }
        return response;
    }
}