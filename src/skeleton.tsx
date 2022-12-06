import { Skeleton, VStack } from "@chakra-ui/react";

export default function TodoSkeleton() {
  return (
    <VStack>
      <Skeleton w='100%' height={200} />
      <Skeleton w='100%' height={200} />
      <Skeleton w='100%' height={200} />
    </VStack>
  );
}
