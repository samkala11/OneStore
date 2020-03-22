class Api::OrdersController < ApplicationController

    def index 
        @orders = Order.all
    end
    

    def create_order
        @order = Order.new(order_params)
        @order.order_number = (Time.now.to_s.delete("-").delete(":").delete(" ")[2..-8] + rand(10).to_s + rand(10).to_s + rand(10).to_s)[2..-1].to_i
        @order.order_type = 1
        @order.status = 1000
        if @order.save
            render :new
        else
            render json: @order.errors.full_messages, status: 404
        end
    end

    def update_order
        @order2 = Order.where("order_number = #{params[:order][:order_number]}")
        # @order = Song.where("lower(order_no) like '#{query.to_i}' ")
        #  + Song.joins(:artist).where("lower(artists.name) like '#{query}' ")
        if @order2.update(order_params)
            render :updated
        else
            render json: @order2.errors.full_messages, status: 404
        end
    end


    def order_params
        params.require(:order).permit(:order_number, :order_type, :customer_id, :first_name, :last_name, :customer_address, :order_total, :pending_total, :paid_total, :status)
    end
end
