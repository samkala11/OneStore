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
        # query = params[:product][:products]
        query2 = params

        @all_products = []
        errors_rendered = false
        debugger
        if query is_a? Array
            query.each do |product|
                new = Product.new
                new.name = product.name
                new.department_id = product.department_id
                new.price = product.price
                new.long_desc = product.long_desc
                if new.save
                    @all_products << new
                else
                    errors_rendered = true
                    render json: new.errors.full_messages, status: 404
                end
            end
            if (!errors_rendered) 
                render :new
            end
        end

        

        # @product = Product.new(product_params)
        # if @product.save
        #   render :new
        # else
        #   render json: @product.errors.full_messages, status: 404
        # end
    end

    

    def product_params
    params.require(:product).permit(:name, :department_id, :price, :discount_price, :long_desc, :short_desc, products: [])
    end

      
end
