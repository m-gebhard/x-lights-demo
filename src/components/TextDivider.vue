<template>
    <div class="text-divider">
        <hr class="text-divider__hr">
        <span class="text-divider__label">
            <slot></slot>
        </span>
    </div>
</template>

<script>
    export default {
        name: 'text-divider',
    };
</script>
