import { HeroesComponent } from "./heroes.component";
import { of } from "rxjs";

describe('HeroesComponent', () => {
    let heroes: HeroesComponent
    let HEROES;
    let mockService = jasmine.createSpyObj(['getHeroes', 'deleteHero', 'addHero'])
    beforeEach(() => {
        HEROES = [{ id: 1, name: 'SpiderDude', strength: 8 }, { id: 2, name: 'Wonderful Woman', strength: 15 }]
        heroes = new HeroesComponent(mockService)
    })

    it('should have empty heroes', () => {
        expect(heroes.heroes.length).toBe(0)
    })

    it('should call ngOnInit', () => {
        mockService.getHeroes.and.returnValue(of(true))
        heroes.ngOnInit()
        expect(mockService.getHeroes).toHaveBeenCalled()
    })
    describe('Delete function', () => {
        it('should remove the passed hero from the HEROES list', () => {
            mockService.deleteHero.and.returnValue(of(true))
            heroes.heroes = HEROES
            heroes.delete(HEROES[1])
            expect(heroes.heroes.length).toBe(1)
        })

        it('should call deleteHero', () => {
            mockService.deleteHero.and.returnValue(of(true))
            heroes.heroes = HEROES
            heroes.delete(HEROES[1])
            expect(mockService.deleteHero).toHaveBeenCalledWith(HEROES[1])
        })
    })

    describe('Add function', () => {
        it('should return if name is undefined', () => {
            mockService.addHero.and.returnValue(of(true))
            expect(heroes.add('')).toBeUndefined()
        })

        it('should call addHero' , () => {
            mockService.addHero.and.returnValue(of(true))
            heroes.add('SpiderDude')
            expect(mockService.addHero).toHaveBeenCalledWith({name : 'SpiderDude' , strength : 11})
        })
    })
})