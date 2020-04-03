json.extract! @order_line, :id, :order_id, :line_no, :sub_line_no, :product_id, :quantity, :line_total

json.productName @order_line.product.name
json.unit @order_line.product.unit
json.productPrice @order_line.product.price