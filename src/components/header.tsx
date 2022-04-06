import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Spacer,
  Portal,
  forwardRef,
  LinkProps,
} from "@chakra-ui/react";
import { Menu, X, ChevronDown, ChevronRight } from "react-feather";
import NextLink from "next/link";
import { ReactNode } from "react";
import { useRouter } from "next/router";

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        bg={"whiteAlpha.800"}
        backdropFilter="blur(4px)"
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? (
                <Icon as={X} w={3} h={3} />
              ) : (
                <Icon as={Menu} w={5} h={5} />
              )
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <NextLink href={"/"} passHref>
            <Link
              textAlign={useBreakpointValue({ base: "center", md: "left" })}
              fontSize="18px"
              fontFamily={"heading"}
              color={useColorModeValue("gray.800", "white")}
              fontWeight="bold"
              _hover={{
                textDecoration: "none",
              }}
            >
              The Musculoskeletal System
            </Link>
          </NextLink>
          <Spacer />

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const PopoverLink = forwardRef(function PopoverLinkInner(
  { children, ...props }: LinkProps & { children: ReactNode },
  ref
) {
  return (
    <PopoverTrigger>
      <Link {...props}>{children}</Link>
    </PopoverTrigger>
  );
});

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");
  const router = useRouter();
  const currSection = router.pathname;

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <NextLink href={navItem.href ?? "#"} passHref>
              <PopoverLink
                p={2}
                fontSize={"sm"}
                fontWeight={currSection == navItem.href ? "bold" : 500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </PopoverLink>
            </NextLink>

            {navItem.children && (
              <Portal>
                <PopoverContent
                  zIndex={1001}
                  border={0}
                  boxShadow={"xl"}
                  bg={popoverContentBgColor}
                  p={2}
                  mt={2}
                  rounded={"md"}
                  width="fit-content"
                >
                  <Stack spacing={0}>
                    {navItem.children.map((child) => (
                      <DesktopSubNav
                        key={child.label}
                        {...child}
                        parentHref={navItem.href!}
                      />
                    ))}
                  </Stack>
                </PopoverContent>
              </Portal>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({
  label,
  href,
  subLabel,
  parentHref,
}: NavItem & { parentHref: string }) => {
  return (
    <NextLink href={parentHref + (href ?? "")} passHref>
      <Link
        href={href}
        role={"group"}
        display={"block"}
        p={2}
        rounded={"md"}
        _hover={{ bg: useColorModeValue("blue.50", "gray.900") }}
      >
        <Stack direction={"row"} align={"center"}>
          <Box>
            <Text
              transition={"all .3s ease"}
              _groupHover={{ color: "blue.400" }}
              fontWeight={500}
            >
              {label}
            </Text>
            <Text fontSize={"sm"}>{subLabel}</Text>
          </Box>
          <Flex
            transition={"all .3s ease"}
            transform={"translateX(-10px)"}
            opacity={0}
            _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
            justify={"flex-end"}
            align={"center"}
            flex={1}
          >
            <Icon color={"blue.400"} w={5} h={5} as={ChevronRight} />
          </Flex>
        </Stack>
      </Link>
    </NextLink>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <NextLink href={href ?? "#"} passHref>
        <Flex
          py={2}
          as={Link}
          justify={"space-between"}
          align={"center"}
          _hover={{
            textDecoration: "none",
          }}
        >
          <Text
            fontWeight={600}
            color={useColorModeValue("gray.600", "gray.200")}
          >
            {label}
          </Text>
          {children && (
            <Icon
              as={ChevronDown}
              transition={"all .25s ease-in-out"}
              transform={isOpen ? "rotate(180deg)" : ""}
              w={6}
              h={6}
            />
          )}
        </Flex>
      </NextLink>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <NextLink
                href={href + (child.href ?? "")}
                passHref
                key={child.label}
              >
                <Link py={2}>{child.label}</Link>
              </NextLink>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Bone",
    href: "/bone",
    children: [
      {
        label: "Overview",
        href: "#overview",
      },
      {
        label: "Bone Marrow",
        href: "#marrow",
      },
    ],
  },
  {
    label: "Joints",
    href: "/joints",
    children: [
      {
        label: "Cartilage",
        href: "#cartilage",
      },
      {
        label: "Ligaments",
        href: "#ligaments",
      },
      {
        label: "Bursae",
        href: "#bursae",
      },
      {
        label: "Tendons",
        href: "#tendons",
      },
      {
        label: "Types of Joints",
        href: "#joint-types",
      },
    ],
  },
  {
    label: "Muscle",
    href: "/muscle",
  },
  {
    label: "In Action",
    href: "/in-action",
    children: [
      { label: "Flexing Muscles", href: "#flexing" },
      { label: "Balancing", href: "#balancing" },
    ],
  },
  {
    label: "Staying Healthy",
    href: "/staying-healthy",
    children: [
      { label: "FOP: A Rare Condition", href: "#condition" },
      { label: "Staying Healthy", href: "#staying-healthy" },
    ],
  },
];

export const URL_TO_TITLE: { [key: string]: string } = Object.fromEntries(
  NAV_ITEMS.map(({ label, href }) => [(href?.split("/") ?? ["", ""])[1], label])
);
