class Api::OrderLinesController < ApplicationController


    # def by_order_no
    #     query = params[:order_no]
    #     @order_lines = OrderLine.joins(:order).where("orders.order_number = #{query}")
    #     render :order_lines
    # end

    def create_order_line
        @order_line = OrderLine.new(order_line_params)
        @order_line.line_no = 1
        # @order_line.product_id = 4
        # @order_line.status = 1000
        if @order_line.save
            p "order_line #{@order_line.product_id} created successfuly"
            render :new
        else
            render json: @order_line.errors.full_messages, status: 404
        end
    end

    # needs 2 params to find the order
    def update_order_line
        product_id = params[:order_line][:product_id]
        order_id = params[:order_line][:order_id]
        @order_line = OrderLine.where("product_id = #{product_id} and order_id = #{order_id}")[0]
        # @order_line.status = 1000
        if @order_line.update(order_line_params)
            p "order_line #{@order_line.product_id} updated successfuly"
            render :updated
        else
            render json: @order_line.errors.full_messages, status: 404
        end
    end

    def orderlines_by_order
        query = params[:order_id]
        @order_lines =  OrderLine.where("order_id = '#{query}'")
        render :order_lines_order
    end

    def order_line_params
        params.require(:order_line).permit(:order_id, :line_no, :product_id, :quantity, :line_total, :unit)
    end
    
    
end
