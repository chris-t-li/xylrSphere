Rails.application.routes.draw do
  resources :pricings
  resources :wallets
  resources :coins
  resources :portfolios
  resources :nfts
  resources :users
  # route to test config
  get '/hello', to: 'application#hello_world'
end
