class CreateWallets < ActiveRecord::Migration[7.0]
  def change
    create_table :wallets do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :coin, null: false, foreign_key: true
      t.float :quantity

      t.timestamps
    end
  end
end
