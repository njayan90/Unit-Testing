import { StrengthPipe } from "./strength.pipe";

describe('StrengthPipe' , () => {
    let strengthPipe : StrengthPipe

    beforeEach(() => {
        strengthPipe = new StrengthPipe()
    })
    it('should display weak if Strength is 5' , () => {
        expect(strengthPipe.transform(5)).toBe(5 + ' (weak)')
    })

    it('should display strong if strength is 10', () => {
        expect(strengthPipe.transform(10)).toBe(10+' (strong)')
    })

    it('should display unbelievable if strength is 20' , () => {
        expect(strengthPipe.transform(20)).toBe(20+" (unbelievable)")
    })
})