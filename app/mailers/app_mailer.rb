class AppMailer < ApplicationMailer
    default :from => 'onestore@team.com'
    
    def new_order_email(order)
        mail(
        to: 'kalashsam17@gmail.com',
        subject: 'New Order',
        body: 'a new order is created'
        )
    end
    
end
