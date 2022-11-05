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
/+  default-agent, dbug, verb
::
|%
++  agent
  ^-  $-(agent:gall agent:gall)
  |^  agent
  ::
  +$  card  card:agent:gall
  ::
  +$  state-0
    $:  %0
        on=?
    ==
  ::
  ++  helper
    |_  [=bowl:gall state-0]
    +*  state  +<+
    ++  play-card
      |=  =card
      ^-  (quip ^card _state)
      ?.  ?=([%give %fact *] card)  [[card]~ state]
      ?:  =(~ paths.p.card)  [[card]~ state]
      =/  [int=(list path) ext=(list path)]
        %+  skid  paths.p.card
        |=  =path
        ?=([%~.~ %tonic *] path)
      =/  caz=(list ^card)
        ?:  =(~ ext)  ~
        [card(paths.p ext)]~
      [caz state]
    ::
    ++  play-cards
      |=  cards=(list card)
      ^-  (quip card _state)
      =|  out=(list card)
      |-
      ?~  cards  [out state]
      =^  caz  state  (play-card i.cards)
      $(out (weld out caz), cards t.cards)
    ::
    ++  get-rev
      ^-  cass:clay
      =/  our  (scot %p our.bowl)
      =/  wen  (scot %da now.bowl)
      .^(cass:clay /cw/[our]/[q.byk.bowl]/[wen])
    --
  ::
  ++  agent
    |=  inner=agent:gall
    =|  state-0
    =*  state  -
    %+  verb  |
    ^-  agent:gall
    |_  =bowl:gall
    +*  this    .
        def   ~(. (default-agent this %|) bowl)
        og    ~(. inner bowl)
        up    ~(. helper bowl state)
    ++  on-init
      ^-  (quip card _this)
      =^  cards   inner  on-init:og
      =^  cards   state  (play-cards:up cards)
      [cards this]
    ::
    ++  on-save  !>([[%tonic state] on-save:og])
    ++  on-load
      |=  ole=vase
      ^-  (quip card _this)
      =/  give  [%give %fact ~[/tonic/current] cass+!>(get-rev:up)]
      ?.  ?=([[%tonic *] *] q.ole)
        =^  cards  inner  (on-load:og ole)
        =^  cards  state  (play-card:up give)
        =^  cards  state  (play-cards:up cards)
        [cards this]
      ::
      =+  !<([[%tonic old=state-0] ile=vase] ole)
      =.  state  old
      =^  cards  inner  (on-load:og ile)
      =^  cards  state  (play-card:up give)
      =^  cards  state  (play-cards:up cards)
      [cards this]
    ::
    ++  on-watch
      |=  =path
      ^-  (quip card _this)
      ?.  ?=([%tonic *] path)
        =^  cards  inner  (on-watch:og path)
        =^  cards  state  (play-cards:up cards)
      [cards this]
      =/  give
        ?+  path  (on-watch:def path)
            [%tonic %current ~]
          [%give %fact ~[/tonic/current] cass+!>(get-rev:up)]
        ==
      =^  cards  state  (play-card:up give)
      =^  cards  state  (play-cards:up cards)
      [cards this]
    ::
    ++  on-agent
      |=  [=wire =sign:agent:gall]
      ^-  (quip card _this)
      =^  cards  inner  (on-agent:og wire sign)
      =^  cards  state  (play-cards:up cards)
      [cards this]
    ::
    ++  on-peek  on-peek:og
    ::
    ++  on-leave
      |=  =path
      ^-  (quip card _this)
      =^  cards  inner  (on-leave:og path)
      =^  cards  state  (play-cards:up cards)
      [cards this]
    ::
    ++  on-poke
      |=  [=mark =vase]
      ^-  (quip card _this)
      ?:  ?=(%tonic mark)
        ?-  !<(?(%on %off) vase)
          %on  `this(on &)
          %off  `this(on |)
        ==
      =^  cards  inner  (on-poke:og +<)
      =^  cards  state  (play-cards:up cards)
      [cards this]
    ::
    ++  on-arvo
      |=  [=wire sign=sign-arvo:agent:gall]
      ^-  (quip card _this)
      =^  cards  inner  (on-arvo:og wire sign)
      =^  cards  state  (play-cards:up cards)
      [cards this]
    ::
    ++  on-fail
      |=  [term tang]
      ^-  (quip card _this)
      =^  cards  inner  (on-fail:og +<)
      =^  cards  state  (play-cards:up cards)
      [cards this]
    --
  --
++  inject
  |=  desk=@tas
  ^-  manx
  =/  dek=tape  (trip desk)
  ~&  dek
  =-  ;script(type "module"): {-}
  """
  import urbitHttpApi from 'https://cdn.skypack.dev/@urbit/http-api';
  import '/session.js';

  const api = new urbitHttpApi('', '', '{dek}');
  api.ship = window.ship;
  
  let first = true;
  let oldRev = 0;

  function check(cass) \{
    if (oldRev !== cass.rev && !first) \{
      location.reload();
    }
      
    first = false;
    oldRev = cass.rev;
  }

  api.subscribe(\{
    app: '{dek}',
    path: '/tonic/current',
    event: check
  })
  """
--