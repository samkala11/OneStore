import $ from "jquery";

export const createOrderLine = order_line => (
    $.ajax({
      method: 'POST',
      url: '/api/orderlines/new',
      data: { order_line }
    })
);

export const updateOrderLine = order_line => (
    $.ajax({
      method: 'PUT',
      url: '/api/orderlines/update',
      data: { order_line }
    })
);