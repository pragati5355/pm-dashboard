import { MoveDirection } from "tsparticles-engine";

export const particleObject = {
    fps_limit: 60,
    interactivity: {
        InteractivityDetect: 'canvas',
        events: {
            onclick: { enable: true, mode: 'push' },
            onhover: {
                enable: true,
                mode: 'attract',
                parallax: { enable: false, force: 60, smooth: 10 },
            },
            resize: true,
        },
        modes: {
            push: { quantity: 4 },
            attract: { distance: 200, duration: 0.4, factor: 5 },
        },
    },
    particles: {
        color: { value: '#ffffff' },
        line_linked: {
            color: '#ffffff',
            distance: 150,
            enable: true,
            opacity: 0.2,
            width: 1,
        },
        move: {
            attract: { enable: false, rotateX: 600, rotateY: 1200 },
            bounce: false,
            MoveDirection: 'none',
            enable: true,
            OutMode: 'out',
            random: false,
            speed: 2,
            straight: false,
        },
        number: { density: { enable: true, value_area: 800 }, value: 80 },
        opacity: {
            anim: {
                enable: false,
                opacity_min: 0.1,
                speed: 1,
                sync: false,
            },
            random: false,
            value: 0.5,
        },
        shape: {
            character: {
                fill: false,
                font: 'Verdana',
                style: '',
                value: '*',
                weight: '400',
            },
            image: {
                height: 100,
                replace_color: true,
                src: 'images/github.svg',
                width: 100,
            },
            polygon: { nb_sides: 5 },
            stroke: { color: '#000000', width: 0 },
            type: 'circle',
        },
        size: {
            anim: { enable: false, size_min: 0.1, speed: 40, sync: false },
            random: true,
            value: 5,
        },
    },
    polygon: {
        draw: { enable: false, lineColor: '#ffffff', lineWidth: 0.5 },
        move: { radius: 10 },
        scale: 1,
        type: 'none',
        url: '',
    },
    retina_detect: true,
};


export const snowOptions = {
    particles: {
        number: {
            value: 150,
        },
        move: {
            direction: MoveDirection.bottom,
            enable: true,
            random: false,
            straight: false,
        },
        opacity: {
            value: { min: 0.1, max: 0.5 },
        },
        size: {
            value: { min: 1, max: 4 },
        },
        wobble: {
            distance: 20,
            enable: true,
            speed: {
                min: -5,
                max: 5,
            },
        },
    },
};