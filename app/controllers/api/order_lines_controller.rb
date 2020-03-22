class Api::OrderLinesController < ApplicationController


    # def by_order_no
    #     query = params[:order_no]
    #     @order_lines = OrderLine.joins(:order).where("orders.order_number = #{query}")
    #     render :order_lines
    # end

    def create_order_line
        @order_line = OrderLine.new(order_line_params)
        # @order_line.order_line_number = (Time.now.to_s.delete("-").delete(":").delete(" ")[2..-8] + rand(10).to_s + rand(10).to_s + rand(10).to_s)[2..-1].to_i
        @order_line.line_no = 2
        @order_line.product_id = 4
        # @order_line.status = 1000
        if @order_line.save
            p "order_line #{@order_line.product_id} created successfuly"
            render :new
        else
            render json: @order_line.errors.full_messages, status: 404
        end
    end

    def order_line_params
        params.require(:order_line).permit(:order_id, :line_no, :product_id, :quantity, :line_total)
    end
    
    
end
