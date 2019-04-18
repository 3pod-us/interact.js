import test from '@interactjs/_dev/test/test';
import Eventable from '@interactjs/core/Eventable';
import * as helpers from '@interactjs/core/tests/_helpers';
import Signals from '@interactjs/utils/Signals';
import pointerEvents from './base';
import holdRepeat from './holdRepeat';
function mockScope() {
    return helpers.mockScope({
        pointerEvents: {
            defaults: {},
            signals: new Signals(),
            types: [],
            fire: () => { },
        },
    });
}
test('holdRepeat count', (t) => {
    const pointerEvent = {
        type: 'hold',
        count: 0,
    };
    const { scope } = helpers.testEnv({ plugins: [pointerEvents, holdRepeat] });
    scope.pointerEvents.signals.fire('new', { pointerEvent });
    t.equal(pointerEvent.count, 1, 'first hold count is 1 with count previously undefined');
    const count = 20;
    pointerEvent.count = count;
    scope.pointerEvents.signals.fire('new', { pointerEvent });
    t.equal(pointerEvent.count, count + 1, 'existing hold count is incremented');
    t.end();
});
test('holdRepeat onFired', (t) => {
    const scope = mockScope();
    scope.usePlugin(pointerEvents);
    scope.usePlugin(holdRepeat);
    const interaction = scope.interactions.new({});
    const pointerEvent = {
        type: 'hold',
    };
    const eventTarget = {};
    const eventable = new Eventable(Object.assign({}, scope.pointerEvents.defaults, {
        holdRepeatInterval: 0,
    }));
    const signalArg = {
        interaction,
        pointerEvent,
        eventTarget,
        targets: [{
                eventable,
            }],
    };
    scope.pointerEvents.signals.fire('fired', signalArg);
    t.notOk('holdIntervalHandle' in interaction, 'interaction interval handle was not saved with 0 holdRepeatInterval');
    eventable.options.holdRepeatInterval = 10;
    scope.pointerEvents.signals.fire('fired', signalArg);
    t.ok('holdIntervalHandle' in interaction, 'interaction interval handle was saved with interval > 0');
    clearInterval(interaction.holdIntervalHandle);
    pointerEvent.type = 'NOT_HOLD';
    delete interaction.holdIntervalHandle;
    scope.pointerEvents.signals.fire('fired', signalArg);
    t.notOk('holdIntervalHandle' in interaction, 'interaction interval handle is not saved if pointerEvent.type is not "hold"');
    t.end();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9sZFJlcGVhdC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaG9sZFJlcGVhdC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sSUFBSSxNQUFNLDRCQUE0QixDQUFBO0FBQzdDLE9BQU8sU0FBUyxNQUFNLDRCQUE0QixDQUFBO0FBQ2xELE9BQU8sS0FBSyxPQUFPLE1BQU0saUNBQWlDLENBQUE7QUFDMUQsT0FBTyxPQUFPLE1BQU0sMkJBQTJCLENBQUE7QUFDL0MsT0FBTyxhQUFhLE1BQU0sUUFBUSxDQUFBO0FBQ2xDLE9BQU8sVUFBVSxNQUFNLGNBQWMsQ0FBQTtBQUVyQyxTQUFTLFNBQVM7SUFDaEIsT0FBTyxPQUFPLENBQUMsU0FBUyxDQUFDO1FBQ3ZCLGFBQWEsRUFBRTtZQUNiLFFBQVEsRUFBRSxFQUFFO1lBQ1osT0FBTyxFQUFFLElBQUksT0FBTyxFQUFFO1lBQ3RCLEtBQUssRUFBRSxFQUFFO1lBQ1QsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFFLENBQUM7U0FDZjtLQUNGLENBQUMsQ0FBQTtBQUNKLENBQUM7QUFFRCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUM3QixNQUFNLFlBQVksR0FBRztRQUNuQixJQUFJLEVBQUUsTUFBTTtRQUNaLEtBQUssRUFBRSxDQUFDO0tBQ1QsQ0FBQTtJQUVELE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUUzRSxLQUFLLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQTtJQUN6RCxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLHVEQUF1RCxDQUFDLENBQUE7SUFFdkYsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFBO0lBQ2hCLFlBQVksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO0lBQzFCLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFBO0lBQ3pELENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxLQUFLLEdBQUcsQ0FBQyxFQUFFLG9DQUFvQyxDQUFDLENBQUE7SUFFNUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFBO0FBQ1QsQ0FBQyxDQUFDLENBQUE7QUFFRixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUMvQixNQUFNLEtBQUssR0FBRyxTQUFTLEVBQUUsQ0FBQTtJQUN6QixLQUFLLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFBO0lBQzlCLEtBQUssQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUE7SUFFM0IsTUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDOUMsTUFBTSxZQUFZLEdBQUc7UUFDbkIsSUFBSSxFQUFFLE1BQU07S0FDYixDQUFBO0lBQ0QsTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFBO0lBQ3RCLE1BQU0sU0FBUyxHQUFHLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFO1FBQzlFLGtCQUFrQixFQUFFLENBQUM7S0FDdEIsQ0FBQyxDQUFDLENBQUE7SUFDSCxNQUFNLFNBQVMsR0FBRztRQUNoQixXQUFXO1FBQ1gsWUFBWTtRQUNaLFdBQVc7UUFDWCxPQUFPLEVBQUUsQ0FBQztnQkFDUixTQUFTO2FBQ1YsQ0FBQztLQUNILENBQUE7SUFFRCxLQUFLLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFBO0lBQ3BELENBQUMsQ0FBQyxLQUFLLENBQUMsb0JBQW9CLElBQUksV0FBVyxFQUN6QyxxRUFBcUUsQ0FBQyxDQUFBO0lBRXhFLFNBQVMsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEdBQUcsRUFBRSxDQUFBO0lBQ3pDLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUE7SUFDcEQsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsSUFBSSxXQUFXLEVBQ3RDLHlEQUF5RCxDQUFDLENBQUE7SUFFNUQsYUFBYSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO0lBRTdDLFlBQVksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFBO0lBQzlCLE9BQU8sV0FBVyxDQUFDLGtCQUFrQixDQUFBO0lBQ3JDLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUE7SUFDcEQsQ0FBQyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsSUFBSSxXQUFXLEVBQ3pDLDZFQUE2RSxDQUFDLENBQUE7SUFFaEYsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFBO0FBQ1QsQ0FBQyxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdGVzdCBmcm9tICdAaW50ZXJhY3Rqcy9fZGV2L3Rlc3QvdGVzdCdcbmltcG9ydCBFdmVudGFibGUgZnJvbSAnQGludGVyYWN0anMvY29yZS9FdmVudGFibGUnXG5pbXBvcnQgKiBhcyBoZWxwZXJzIGZyb20gJ0BpbnRlcmFjdGpzL2NvcmUvdGVzdHMvX2hlbHBlcnMnXG5pbXBvcnQgU2lnbmFscyBmcm9tICdAaW50ZXJhY3Rqcy91dGlscy9TaWduYWxzJ1xuaW1wb3J0IHBvaW50ZXJFdmVudHMgZnJvbSAnLi9iYXNlJ1xuaW1wb3J0IGhvbGRSZXBlYXQgZnJvbSAnLi9ob2xkUmVwZWF0J1xuXG5mdW5jdGlvbiBtb2NrU2NvcGUgKCkge1xuICByZXR1cm4gaGVscGVycy5tb2NrU2NvcGUoe1xuICAgIHBvaW50ZXJFdmVudHM6IHtcbiAgICAgIGRlZmF1bHRzOiB7fSxcbiAgICAgIHNpZ25hbHM6IG5ldyBTaWduYWxzKCksXG4gICAgICB0eXBlczogW10sXG4gICAgICBmaXJlOiAoKSA9PiB7fSxcbiAgICB9LFxuICB9KVxufVxuXG50ZXN0KCdob2xkUmVwZWF0IGNvdW50JywgKHQpID0+IHtcbiAgY29uc3QgcG9pbnRlckV2ZW50ID0ge1xuICAgIHR5cGU6ICdob2xkJyxcbiAgICBjb3VudDogMCxcbiAgfVxuXG4gIGNvbnN0IHsgc2NvcGUgfSA9IGhlbHBlcnMudGVzdEVudih7IHBsdWdpbnM6IFtwb2ludGVyRXZlbnRzLCBob2xkUmVwZWF0XSB9KVxuXG4gIHNjb3BlLnBvaW50ZXJFdmVudHMuc2lnbmFscy5maXJlKCduZXcnLCB7IHBvaW50ZXJFdmVudCB9KVxuICB0LmVxdWFsKHBvaW50ZXJFdmVudC5jb3VudCwgMSwgJ2ZpcnN0IGhvbGQgY291bnQgaXMgMSB3aXRoIGNvdW50IHByZXZpb3VzbHkgdW5kZWZpbmVkJylcblxuICBjb25zdCBjb3VudCA9IDIwXG4gIHBvaW50ZXJFdmVudC5jb3VudCA9IGNvdW50XG4gIHNjb3BlLnBvaW50ZXJFdmVudHMuc2lnbmFscy5maXJlKCduZXcnLCB7IHBvaW50ZXJFdmVudCB9KVxuICB0LmVxdWFsKHBvaW50ZXJFdmVudC5jb3VudCwgY291bnQgKyAxLCAnZXhpc3RpbmcgaG9sZCBjb3VudCBpcyBpbmNyZW1lbnRlZCcpXG5cbiAgdC5lbmQoKVxufSlcblxudGVzdCgnaG9sZFJlcGVhdCBvbkZpcmVkJywgKHQpID0+IHtcbiAgY29uc3Qgc2NvcGUgPSBtb2NrU2NvcGUoKVxuICBzY29wZS51c2VQbHVnaW4ocG9pbnRlckV2ZW50cylcbiAgc2NvcGUudXNlUGx1Z2luKGhvbGRSZXBlYXQpXG5cbiAgY29uc3QgaW50ZXJhY3Rpb24gPSBzY29wZS5pbnRlcmFjdGlvbnMubmV3KHt9KVxuICBjb25zdCBwb2ludGVyRXZlbnQgPSB7XG4gICAgdHlwZTogJ2hvbGQnLFxuICB9XG4gIGNvbnN0IGV2ZW50VGFyZ2V0ID0ge31cbiAgY29uc3QgZXZlbnRhYmxlID0gbmV3IEV2ZW50YWJsZShPYmplY3QuYXNzaWduKHt9LCBzY29wZS5wb2ludGVyRXZlbnRzLmRlZmF1bHRzLCB7XG4gICAgaG9sZFJlcGVhdEludGVydmFsOiAwLFxuICB9KSlcbiAgY29uc3Qgc2lnbmFsQXJnID0ge1xuICAgIGludGVyYWN0aW9uLFxuICAgIHBvaW50ZXJFdmVudCxcbiAgICBldmVudFRhcmdldCxcbiAgICB0YXJnZXRzOiBbe1xuICAgICAgZXZlbnRhYmxlLFxuICAgIH1dLFxuICB9XG5cbiAgc2NvcGUucG9pbnRlckV2ZW50cy5zaWduYWxzLmZpcmUoJ2ZpcmVkJywgc2lnbmFsQXJnKVxuICB0Lm5vdE9rKCdob2xkSW50ZXJ2YWxIYW5kbGUnIGluIGludGVyYWN0aW9uLFxuICAgICdpbnRlcmFjdGlvbiBpbnRlcnZhbCBoYW5kbGUgd2FzIG5vdCBzYXZlZCB3aXRoIDAgaG9sZFJlcGVhdEludGVydmFsJylcblxuICBldmVudGFibGUub3B0aW9ucy5ob2xkUmVwZWF0SW50ZXJ2YWwgPSAxMFxuICBzY29wZS5wb2ludGVyRXZlbnRzLnNpZ25hbHMuZmlyZSgnZmlyZWQnLCBzaWduYWxBcmcpXG4gIHQub2soJ2hvbGRJbnRlcnZhbEhhbmRsZScgaW4gaW50ZXJhY3Rpb24sXG4gICAgJ2ludGVyYWN0aW9uIGludGVydmFsIGhhbmRsZSB3YXMgc2F2ZWQgd2l0aCBpbnRlcnZhbCA+IDAnKVxuXG4gIGNsZWFySW50ZXJ2YWwoaW50ZXJhY3Rpb24uaG9sZEludGVydmFsSGFuZGxlKVxuXG4gIHBvaW50ZXJFdmVudC50eXBlID0gJ05PVF9IT0xEJ1xuICBkZWxldGUgaW50ZXJhY3Rpb24uaG9sZEludGVydmFsSGFuZGxlXG4gIHNjb3BlLnBvaW50ZXJFdmVudHMuc2lnbmFscy5maXJlKCdmaXJlZCcsIHNpZ25hbEFyZylcbiAgdC5ub3RPaygnaG9sZEludGVydmFsSGFuZGxlJyBpbiBpbnRlcmFjdGlvbixcbiAgICAnaW50ZXJhY3Rpb24gaW50ZXJ2YWwgaGFuZGxlIGlzIG5vdCBzYXZlZCBpZiBwb2ludGVyRXZlbnQudHlwZSBpcyBub3QgXCJob2xkXCInKVxuXG4gIHQuZW5kKClcbn0pXG4iXX0=