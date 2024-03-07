import { Card, H6, Image, Text, YStack } from "tamagui";

import { api } from "~/utils/api";

export default function ProductsScreen() {
  const { data: products } = api.shop.products.useQuery();

  return (
    <YStack padding="$4" space>
      <H6>Products</H6>
      <YStack space>
        {products?.map((product) => (
          <Card key={product.id} bordered padding="$4" width="100%" space>
            <Text>{product.name}</Text>
            <Image
              source={{ uri: product.images[0] }}
              width={100}
              height={100}
            />
          </Card>
        ))}
      </YStack>
    </YStack>
  );
}
