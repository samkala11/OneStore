@order_lines.each do |order_line|
    json.set! order_line.id do
        json.extract! order_line, :id, :order_id, :line_no, :sub_line_no, :product_id, :line_total, :line_note, :quantity
        json.productName order_line.product.name
        json.unit order_line.product.unit
        json.productPrice order_line.product.price
    end
end
  
  
  
  