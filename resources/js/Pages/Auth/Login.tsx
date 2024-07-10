
import { useEffect, FormEventHandler } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    Input,
    VStack,
    Text,
    Flex,
    useColorModeValue,
    Heading,
} from '@chakra-ui/react';
import LoginLayout from '@/Layouts/LoginLayout';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Login({ status, canResetPassword }: { status?: string, canResetPassword: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        login_id: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    const bgColor = useColorModeValue('white', 'gray.700');
    const textColor = useColorModeValue('gray.600', 'gray.200');

    return (
        <LoginLayout>
            <Head title="ログイン" />
            <Box
                flex="1"
                display="flex"
                justifyContent="center"
                alignItems="center"
                py={8}

            >
                <Box as={ApplicationLogo} h="9" w="auto" color="gray.800" />
            </Box>
            <Box bg={bgColor} p={8} rounded="lg" shadow="md" w="full" maxW="md">
                <Heading size="sm" textAlign="center" mb={8}>
                    ログインをしてください
                </Heading>
                {status && <Text color="green.500" mb={4}>{status}</Text>}

                <form onSubmit={submit}>
                    <VStack spacing={4}>
                        <FormControl isInvalid={!!errors.login_id}>
                            <FormLabel htmlFor="login_id">ユーザーID</FormLabel>
                            <Input
                                id="login_id"
                                type="text"
                                name="user_id"
                                value={data.login_id}
                                onChange={(e) => setData('login_id', e.target.value)}
                                autoComplete="username"
                            />
                            {errors.login_id && <Text color="red.500" fontSize="sm">{errors.login_id}</Text>}
                        </FormControl>

                        <FormControl isInvalid={!!errors.password}>
                            <FormLabel htmlFor="password">パスワード</FormLabel>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                autoComplete="current-password"
                            />
                            {errors.password && <Text color="red.500" fontSize="sm">{errors.password}</Text>}
                        </FormControl>

                        <Checkbox
                            isChecked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        >
                            <Text fontSize="sm" color={textColor}>ログイン状態を保持する</Text>
                        </Checkbox>

                        <Button
                            type="submit"
                            colorScheme="blue"
                            width="full"
                            isLoading={processing}
                            loadingText="ログイン中..."
                        >
                            ログイン
                        </Button>
                    </VStack>
                </form>

            </Box>
        </LoginLayout>
    );
}
