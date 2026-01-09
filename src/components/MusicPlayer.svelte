<script lang="ts">
    let currentTrackIndex = $state(0);
    let isPlaying = $state(false);
    let progress = $state(0);

    const { playlist = [] } = $props<{ playlist?: Array<{ title: string; artist: string; src: string }> }>();

    $effect(() => {
        window.AppEvent?.listen("audio:progress", (data: any) => {
            progress = data.progress;
        });

        if (window.audio) {
            currentTrackIndex = window.audio.index || 0;
            isPlaying = !window.audio.paused;
        }
    });

    function togglePlay() {
        if (!window.audio || window.audio?.src === "") {
            playTrack(0);
            return;
        }

        if (isPlaying) {
            window.AppEvent.dispatch("audio:pause");
            isPlaying = false;
        } else {
            window.AppEvent.dispatch("audio:resume");
            isPlaying = true;
        }
    }

    function playTrack(index: number) {
        if (index !== currentTrackIndex) {
            currentTrackIndex = index;
            progress = 0;
        }
        isPlaying = true;

        window.AppEvent.dispatch("audio:play", { src: playlist[index].src, index });
    }

    function prevTrack() {
        const newIndex = currentTrackIndex === 0 ? playlist.length - 1 : currentTrackIndex - 1;
        playTrack(newIndex);
    }

    function nextTrack() {
        const newIndex = (currentTrackIndex + 1) % playlist.length;
        playTrack(newIndex);
    }

    function onSeek(event: MouseEvent) {
        const target = event.currentTarget as HTMLDivElement;
        const rect = target.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const percentage = clickX / rect.width;

        window.AppEvent.dispatch("audio:seek", percentage);
    }
</script>

<div class="bg-black/40 backdrop-blur-md p-8 rounded-sm w-full mt-12">
    <div class="flex justify-between items-center mb-6">
        <span class="font-mono text-xs text-tomato animate-pulse">LIVE SIGNAL</span>
        <span class="font-mono text-xs text-gray-500">44.1kHz / 24bit</span>
    </div>

    <div class="flex flex-col gap-8">
        <div class="flex justify-center items-center gap-6">
            <button onclick={prevTrack} class="text-gray-500 hover:text-white transition-colors">
                <span class="font-mono text-xs">[PREV]</span>
            </button>

            <button
                onclick={togglePlay}
                class="w-16 h-16 rounded-full border border-cyan-500 flex items-center justify-center hover:bg-cyan/10 transition-all group cursor-pointer"
                aria-label="audio controls"
            >
                <div
                    class="w-0 h-0 border-t-10 border-t-transparent border-l-16 border-l-cyan border-b-10 border-b-transparent ml-1 transition-transform"
                    class:hidden={isPlaying}
                ></div>
                <div class="w-4 h-6 border-l-4 border-r-4 border-cyan-500" class:hidden={!isPlaying}></div>
            </button>

            <button onclick={nextTrack} class="text-gray-500 hover:text-white transition-colors">
                <span class="font-mono text-xs">[NEXT]</span>
            </button>
        </div>

        <div class="flex flex-col gap-2 mt-4 text-left">
            {#each playlist as track, i}
                <div
                    class="track-item cursor-pointer flex flex-col justify-between p-3 hover:bg-white/5 border border-transparent hover:border-cyan-500/30 transition-all group relative"
                >
                    <button class="flex justify-between items-center cursor-pointer" onclick={() => playTrack(i)}>
                        <div class="flex items-center gap-4">
                            <span class="font-mono text-xs text-gray-600 group-hover:text-cyan-500">{`0${i + 1}`}</span>
                            <div class="flex flex-col items-start">
                                <span class="font-sans text-sm font-bold text-gray-300 group-hover:text-white">
                                    {track.title}
                                </span>
                                <span class="font-mono text-[10px] text-gray-500">{track.artist}</span>
                            </div>
                        </div>
                        <span class="font-mono text-xs text-cyan-500">
                            {i === currentTrackIndex ? (isPlaying ? "<PLAYING>" : "<PAUSED>") : "<PLAY>"}
                        </span>
                    </button>

                    {#if i === currentTrackIndex}
                        <button
                            class="w-full h-1 bg-white/20 rounded mt-2 overflow-hidden"
                            onclick={onSeek}
                            aria-label="seek progress bar"
                        >
                            <div class="h-1 bg-cyan-500" style="width: {progress * 100}%"></div>
                        </button>
                    {/if}
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    .track-item {
        position: relative;
    }
</style>
