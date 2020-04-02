Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: "static_pages#root"

  namespace :api, defaults: { format: :json } do

    resources :users, only: [:create, :show, :index]
    resource :session, only: [:create, :destroy]

    resources :products, only: [:index]
    get '/products/name', to: 'products#products_by_name'
    get '/products/department', to: 'products#products_by_department'
    get '/products/price', to: 'products#prodcuts_by_price'
    post '/products/new', to: 'products#create_product'

    resources :orders, only: [:index]
    post 'orders/new', to: 'orders#create_order'
    put 'orders/update', to: 'orders#update_order'

    post 'orderlines/new', to: 'order_lines#create_order_line'
    put 'orderlines/update', to: 'order_lines#update_order_line'
    get 'orderlines/order', to: 'order_lines#orderlines_by_order'

  end

end
