export function ReadableBufferStream(ab: ArrayBuffer) {
    return new ReadableStream({
        start(controller) {
            controller.enqueue(ab)
            controller.close()
        }
    })
}
