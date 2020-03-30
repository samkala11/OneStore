class Api::ProductsController < ApplicationController

    def index 
        @products = Product.all
    end
    
    
    def products_by_name
        name = ('%' + params[:name].downcase + '%')
        @products = Product.where("lower(name) like '#{name}' ") 
        # + Product.joins(:artist).where("lower(artists.name) like '#{query}' ")
        render :products_name
    end

    def products_by_department
        query = params[:department_id]
        @products = Product.where("department_id = '#{query}'")
        render :products_department
    end

    def products_by_price
        price = params[:price]
        @products =  Product.where("price <= '#{price}'")
        render :products_price
    end

    def products_for_price_and_dept
        price = params[:price]
        department = params[:department_id]
        @products =  Product.where("price <= '#{price}' and department_id = '#{department}'")
        render :products_price_dept
    end

    # def get_album_info
    # query = params[:album_id]
    # @album = Album.find(query)
    # render :album_info
    # end

    def create_product
        query = params[:product][:products]

        @all_products = []
        if query
            last_id = 0
            errors_rendered = false
            query.keys.each do |el|
                new = Product.new
                new.name = query[el]["name"]
                new.department_id = query[el]["department_id"]
                new.price = query[el]["price"]
                new.short_desc = query[el]["short_desc"]
                new.product_id = query[el]["product_id"]
                new.unit = query[el]["unit"]
                if new.save
                    @all_products << new
                else
                    errors_rendered = true
                    result = {
                        created_products: @all_products,
                        product_name: new.name,
                        errors: new.errors.full_messages
                    }
                    render json: result, status: 404
                    return
                end
            end
            if (!errors_rendered) 
                render :new
            end
        else
            @product = Product.new(product_params)
            if @product.save
                result = {
                    created_product: @product,
                    product_name: @product.name,
                    errors: false
                }
              render json: result, status: 200
            else
              render json: @product.errors.full_messages, status: 404
            end
        end
            
      
    end

    

    def product_params
    params.require(:product).permit!.to_hash
    # (:name, :department_id, :price, :discount_price, :long_desc, :short_desc, products: [])
    end

      
end
