import minecraftData from 'minecraft-data'

interface ItemsListProps {
  mcVersion: string;
  itemIds: number[];
  onRemoveItem: (itemId: number) => void;
}

const ItemsList: React.FC<ItemsListProps> = ({ mcVersion, itemIds, onRemoveItem }) => {
  const mcData = minecraftData(mcVersion);
  const itemData = itemIds.map(itemId => mcData.items[itemId]);

  return (
    <ul>
      {itemData.map(item => (
        <li key={item.id}>
          <span>{item.displayName}</span>
          <button onClick={() => onRemoveItem(item.id)}>Remove</button>
        </li>
      ))}
    </ul>
  );
};

export default ItemsList;