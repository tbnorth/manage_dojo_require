A small javascript tool to manage dojo require() calls.

(go to http://tbnorth.github.io/manage_dojo_require/ for the tool itself)

Given::
    
    require(["foo/bar", "some/thing", "other/module"],
            function(Bar, Thing) ...

from one piece of code, and::

    require(["some/thing", "also/and_this", "also/this_one"],
            function(Thing, AndThis) ...

from another, it merges them into::
    
    require(["foo/bar", "some/thing", "also/and_this", 
             "other/module", "also/this_one"],
            function(Bar, Thing, AndThis) ...
