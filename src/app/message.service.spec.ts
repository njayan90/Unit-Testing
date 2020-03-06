import { MessageService } from "./message.service";

describe('Message Service' , () => {

    let messageService : MessageService

    beforeEach(() => {
        messageService = new MessageService()
    })

    it('should be emty in the start' , () => {
        expect(messageService.messages.length).toBe(0)
    })

    it('should add messages' , () => {
        messageService.add('message1')
        expect(messageService.messages.length).toBe(1)
    })

    it('should be empty after clear' , () => {
        messageService.clear()
        expect(messageService.messages.length).toBe(0)
    })
})