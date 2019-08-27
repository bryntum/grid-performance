export class FPS {
    static start() {
        this.start      = performance.now();
        this.frameCount = 0;
        this.running    = true;

        console.log('Starting frame counter');

        requestAnimationFrame(this.frameCounter);
    }

    static stop() {
        this.running = false;

        const
            elapsed = performance.now() - this.start,
            fps     = this.frameCount / (elapsed / 1000);

        console.table({
            'Elapsed time' : elapsed,
            'Frames'       : this.frameCount,
            'Average FPS'  : fps
        });
    }

    static frameCounter() {
        FPS.frameCount++;

        if (FPS.running) {
            requestAnimationFrame(FPS.frameCounter)
        }
    }
}

export class RenderTimer {
    static start({ sync = true, callback }) {
        this.start = performance.now();

        console.log('Starting initial rendering measurement');

        callback && callback();

        if (sync) {
            this.stop();
        }
    }

    static stop() {
        const elapsed = performance.now() - this.start;

        console.table({
            'Initial rendering (ms)' : elapsed
        });
    }
}

export class Scroller {
    static scroll({ element, distance = 5000, speed = 10, callback }) {
        let scrollTop = 0;

        console.log('Starting to scroll', element);

        const intervalId = setInterval(() => {
            element.scrollTop = scrollTop;
            scrollTop += speed;

            if (scrollTop > distance) {
                clearInterval(intervalId);

                console.log('Finished scrolling');

                callback && callback();
            }
        }, 1);
    }
}


