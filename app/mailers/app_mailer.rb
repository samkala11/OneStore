class AppMailer < ApplicationMailer
    default :from => 'kalashsam17@gmail.com'
    
    def new_order_email(order)
        mail(
        to: 'samkoki77@gmail.com',
        subject: 'New Order',
        body: 'a new order is created'
        )
    end
    
end
