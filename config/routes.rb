Rails.application.routes.draw do
  # resources :pricings
  # resources :wallets
  # resources :coins
  # resources :portfolios
  resources :nfts, only: [:index]
  # resources :users
end
