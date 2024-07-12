<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- <title inertia>{{ config('app.name', 'Laravel') }}</title> --}}
        <title inertia>ほうれんそう</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=BIZ+UDGothic:wght@400;700&display=swap" rel="stylesheet">

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        {{-- @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"]) --}}
        @vite('resources/js/app.tsx')
        @inertiaHead
    </head>
    <body>
        @inertia
    </body>
</html>
