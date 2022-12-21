class AddPurchasePriceToPortfolios < ActiveRecord::Migration[7.0]
  def change
    add_column :portfolios, :purchase_price, :float
  end
end
