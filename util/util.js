export class FPS {
    static start() {
        this.start = null;
        this.frameCount = 0;
        this.running = true;
        this.frames = [];
        this.prevFrameTime = null;

        console.log('Starting frame counter');

        requestAnimationFrame(this.frameCounter);
    }

    static stop() {
        this.running = false;

        const
            elapsed = performance.now() - this.start,
            sum = this.frames.reduce((sum, time) => sum += time),
            average = this.frames.length / (sum / 1000),
            fps = this.frameCount / (elapsed / 1000);

        console.table({
            'Elapsed time' : elapsed,
            'Frames' : this.frameCount,
            'Frame sum' : sum,
            'Average FPS 1' : fps,
            'Average FPS 2' : average
        });

        console.log(this.frames);
    }

    static frameCounter() {
        const time = performance.now();

        if (FPS.start === null) {
            FPS.start = time;
            FPS.prevFrameTime = time;
        } else {
            FPS.frameCount++;
            FPS.frames.push(time - FPS.prevFrameTime);
        }

        FPS.prevFrameTime = time;

        if (FPS.running) {
            requestAnimationFrame(FPS.frameCounter)
        }
    }
}

export class RenderTimer {
    static start({ sync = true, callback }) {
        this.start = performance.now();
        this.running = true;

        console.log('Starting initial rendering measurement');

        callback && callback();

        if (sync) {
            this.stop();
        }
    }

    static stop() {
        if (this.running) {
            const elapsed = performance.now() - this.start;

            console.table({
                'Initial rendering (ms)' : elapsed
            });

            this.running = false;
        }
    }
}

export class Scroller {
    static scroll({ element, distance = 50000, speed = 5, maxSpeed = 250, acceleration = .5, callback, scrollFn }) {
        let scrollTop = 0;

        console.log('Starting to scroll', element);

        const intervalId = setInterval(() => {
            if (scrollFn) {
                scrollFn(scrollTop)
            } else {
                element.scrollTop = scrollTop;
            }

            scrollTop += speed;

            if (speed < maxSpeed) {
                speed += acceleration;
            }

            if (scrollTop > distance) {
                clearInterval(intervalId);

                console.log('Finished scrolling');

                callback && callback();
            }
        }, 1);
    }
}

export class TreeGenerator {
    static generate({ nodeCount, depth, childrenProperty }) {
        const allNodes = [];

        let count = 0;

        function generateChildren(curDepth, parentId) {
            const
                children = [],
                leafs = curDepth === depth;

            for (let i = 0; i < 5; i++) {
                count++;

                if (count > nodeCount) {
                    return children;
                }

                const node = {
                    id : count,
                    name : (leafs ? 'File ' : 'Folder ') + count,
                    parentId,
                    expanded : true,
                    number1 : count % 2,
                    number2 : count % 3,
                    number3 : count % 4,
                    number4 : count % 5,
                    number5 : count % 6,
                    number6 : count % 7,
                    number7 : count % 8,
                    number8 : count % 9,
                    number9 : count % 10,
                    number10 : count % 11,
                    number11 : count % 12,
                    number12 : count % 13,
                    number13 : count % 14,
                    number14 : count % 15,
                    number15 : count % 16,
                    number16 : count % 17,
                    number17 : count % 18,
                    number18 : count % 19,
                    number19 : count % 20,
                    number20 : count % 21,
                    [leafs ? 'leaf' : childrenProperty] : leafs ? true : generateChildren(curDepth + 1, count)
                };

                children.push(node);

                allNodes.push(node);
            }

            return children;
        }

        return { tree : generateChildren(0), allNodes };
    }
}


