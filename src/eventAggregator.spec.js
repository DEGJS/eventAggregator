import eventAggregator from './eventAggregator';

describe('eventAggregator', () => {
    const mockCallback = jest.fn(e => e);           
    const mockCallback2 = jest.fn(e => e);
    
    const eventName = 'testEvent';

    beforeAll(() => {
        eventAggregator.subscribe(eventName, mockCallback);
        eventAggregator.subscribe(eventName, mockCallback2);
    });

    afterAll(() => {
        eventAggregator.unsubscribe(eventName, mockCallback);
        eventAggregator.unsubscribe(eventName, mockCallback2);
    });

    afterEach(() => {
        jest.clearAllMocks();
    })
    
    describe('publish method', () => {
        it('should accept an evt type String', () => {
            const expectedOutput = {
                type: eventName
            }
            eventAggregator.publish(eventName);
            expect(mockCallback).toHaveBeenCalled();
            expect(mockCallback).toHaveBeenCalledWith(expectedOutput);
        });

        it('should pass payload with string evt', () => {
            const payload = {name: 'test'};
            const expectedOutput = {
                type: eventName,
                ...payload

            }
            eventAggregator.publish(eventName, payload);
            expect(mockCallback).toHaveBeenCalled();
            expect(mockCallback).toHaveBeenCalledWith(expectedOutput);
        })

        it('should accept an evt type Object', () => {
            const input = {
                type: eventName,
                data: { name: 'test'}
            }

            eventAggregator.publish(input);
            expect(mockCallback).toHaveBeenCalled();
            expect(mockCallback).toHaveBeenCalledWith(input);
        });

        it('should error if no event type found', () => {
            expect(() => eventAggregator.publish({}))
                .toThrow(`Event object missing 'type' property.`);
        });

        it('should call multiple listeners', () => {
            eventAggregator.publish(eventName);
            expect(mockCallback).toHaveBeenCalled();
            expect(mockCallback2).toHaveBeenCalled();
        });
    });

    describe('unsubscribe method', () => {
        it('should remove listener', () => {
            eventAggregator.unsubscribe(eventName, mockCallback);
            eventAggregator.publish(eventName);

            expect(mockCallback).not.toHaveBeenCalled();
        });
    });
})