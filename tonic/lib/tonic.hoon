::  tonic: an automatic sail refresher
::
::    when used in conjunction with gin, provides a refreshing way to do
::    sail development. tonic works by augmenting your agent with a
::    subscription endpoint that provides the current desk commit.
::
::    the included $inject gate will add a script into your sail page
::    that will watch for new desk commits and refresh the page if it
::    receives a new commit.
::
|%
++  cass               ::  the latest $cass for the given $bowl
  |=  =bowl:gall
  ^-  cass:clay
  =/  our  (scot %p our.bowl)
  =/  wen  (scot %da now.bowl)
  .^(cass:clay /cw/[our]/[q.byk.bowl]/[wen])
--
|%
++  agent
  |=  =agent:gall
  ^-  agent:gall
  |_  =bowl:gall
  +*  this  .
      ag    ~(. agent bowl)
  ::
  ++  on-init
    ^-  (quip card:agent:gall agent:gall)
    =^  cards  agent  on-init:ag
    [cards this]
  ::
  ++  on-save   on-save:ag
  ::
  ++  on-load
    |=  ole=vase
    ^-  (quip card:agent:gall agent:gall)
    =^  cards  agent  (on-load:ag ole)
    :_  this
    %+  snoc  cards
    [%give %fact ~[/tonic/current] cass+!>((cass bowl))]
  ::
  ++  on-watch
    |=  =path
    ^-  (quip card:agent:gall agent:gall)
    ?.  ?=([%tonic *] path)
      =^  cards  agent  (on-watch:ag path)
      [cards this]
    :_  this
    ?+    path  ~|(bad-watch/path !!)
        [%tonic %current ~]
      [%give %fact ~[/tonic/current] cass+!>((cass bowl))]~
    ==
  ::
  ++  on-agent
    |=  [=wire =sign:agent:gall]
    ^-  (quip card:agent:gall agent:gall)
    =^  cards  agent  (on-agent:ag wire sign)
    [cards this]
  ::
  ++  on-peek  on-peek:ag
  ::
  ++  on-leave
    |=  =path
    ^-  (quip card:agent:gall agent:gall)
    =^  cards  agent  (on-leave:ag path)
    [cards this]
  ::
  ++  on-poke
    |=  [=mark =vase]
    ^-  (quip card:agent:gall agent:gall)
    =^  cards  agent  (on-poke:ag mark vase)
    [cards this]
  ::
  ++  on-arvo
    |=  [=wire =sign-arvo:agent:gall]
    ^-  (quip card:agent:gall agent:gall)
    =^  cards  agent  (on-arvo:ag wire sign-arvo)
    [cards this]
  ::
  ++  on-fail
    |=  [=term =tang]
    ^-  (quip card:agent:gall agent:gall)
    =^  cards  agent  (on-fail:ag term tang)
    [cards this]
  --
++  inject
  |=  desk=@tas
  ^-  manx
  =/  dek=tape  (trip desk)
  =-  ;script(type "module"): {-}
  """
  import urbitHttpApi from 'https://cdn.skypack.dev/@urbit/http-api';
  import '/session.js';

  const api = new urbitHttpApi('', '', '{dek}');
  api.ship = window.ship;

  let oldRev = undefined;
  function check(newCass) \{
    if (oldRev && oldRev !== newCass.rev) \{
      location.reload();
    }
    oldRev = newCass.rev;
  }

  api.subscribe(\{
    app: '{dek}',
    path: '/tonic/current',
    event: check
  })
  """
--
