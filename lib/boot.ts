/**
 * Runs inline in <head> before first paint.
 *  - `js`     : JavaScript runs → interactive components may replace their static lists.
 *  - `motion` : JS runs AND the visitor has not asked for reduced motion → pinned,
 *               scroll-scrubbed choreography and the timed opening.
 * Everyone else gets the complete static layout: nothing waits for a script, and
 * there is no layout jump on hydration.
 */
export const MOTION_BOOT = `(function(){try{var d=document.documentElement;d.classList.add('js');var m=window.matchMedia('(prefers-reduced-motion: reduce)');if(!m.matches)d.classList.add('motion');if(m.addEventListener)m.addEventListener('change',function(){location.reload()});}catch(e){}})();`;
