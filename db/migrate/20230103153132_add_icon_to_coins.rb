class AddIconToCoins < ActiveRecord::Migration[7.0]
  def change
    add_column :coins, :icon, :string
  end
end
