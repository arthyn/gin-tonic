# gin and tonic

Two companions making [sail](https://developers.urbit.org/guides/additional/sail) 
development much nicer.

**gin**: a utility for syncing files from a repository to a clay desk and
committing on save.

**tonic**: a library which auto refreshes your sail page on commit

## getting started

1. First you should install `gin`:
   ```bash
   npm i -g gin-tonic
   ```
2. Next run `gin add` to add a workspace which will be used to sync your 
   files from your repository to the Urbit you're working on and commit.
3. Then run `gin pour` to add the tonic library to your Urbit.
4. Integrate tonic into your gall application by wrapping your gall agent:
   ```hoon
    /+  tonic
    ...
    %-  agent:tonic
    |_  =bowl:gall
    ...
   ```
5. Include tonic's script in each sail page:
  ```hoon
  /+  tonic
  ...
  ;head
    ...
    ;+  (inject:tonic q.byk.bowl)
  ==
  ```
6. Finally run `gin watch` and pick your workspace. Gin will run until
   cancelled syncing your changes.
7. Sip and enjoy!