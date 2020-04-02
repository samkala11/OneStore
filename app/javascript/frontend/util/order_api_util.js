import $ from "jquery";

export const createOrder = order => (
    $.ajax({
      method: 'POST',
      url: '/api/orders/new',
      data: { order }
    })
);

export const updateOrder = order => (
    $.ajax({
      method: 'PUT',
      url: '/api/orders/update',
      data: { order }
    })
);