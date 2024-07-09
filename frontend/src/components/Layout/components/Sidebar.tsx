import { Box, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import NAVIGATION from "@/constants/navigation";
import { useRouter } from "next/router";

const Sidebar = () => {
    const router = useRouter();

    return (
        <Box p={10} borderRight={"0.5px solid gray"} minH={"100vh"}>
            <Link href="/">
                <Image src={'logo.svg'} alt="Logo" width={100} height={100} />
            </Link>

            <VStack pt={10} spacing={5}>
                {NAVIGATION.map((item, index) => (
                    <Link key={index} href={item.href} className="w-full">
                        <HStack>
                            <Icon as={item.icon} w={6} h={6} color={router.pathname === item.href ? "#e50914" : ""} />
                            <Text w={"100%"} textAlign={"left"} textColor={router.pathname === item.href ? "#e50914" : ""}>{item.name}</Text>
                        </HStack>
                    </Link>
                ))}
            </VStack>
        </Box>
    );
}

export default Sidebar;