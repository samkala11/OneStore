class Api::OrdersController < ApplicationController

    def index 
        @orders = Order.all
    end
    

    def create_order
        # @order = Order.new(order_params)
        @order = Order.new()
        @order.order_number = ((Time.now.to_s.delete("-").delete(":").delete(" ")[2..-8] + rand(1000..9999).to_s)[2..-1].to_i * 22 / 24).to_s
        @order.order_type = 1
        @order.status = 1000
        @order.order_total = 1500
        @order.pending_total = 1500
        if @order.save
            p "order #{@order.order_number} created successfuly"
            render :new
        else
            render json: @order.errors.full_messages, status: 404
        end
    end

    def update_order
        @order = Order.where("order_number = #{params[:order][:order_number]}")[0]
        # @order = Song.where("lower(order_no) like '#{query.to_i}' ")
        #  + Song.joins(:artist).where("lower(artists.name) like '#{query}' ")
        if @order.update(order_params)
            p "order #{@order.order_number} updated successfuly"
            render :updated
        else
            render json: @order.errors.full_messages, status: 404
        end
    end


    def order_params
        # params.require(:order).permit!.to_hash
        params.require(:order).permit(:order_number, :order_type, :customer_id, :first_name, :last_name, :customer_address, :order_total, :pending_total, :paid_total, :status)
    end
end
