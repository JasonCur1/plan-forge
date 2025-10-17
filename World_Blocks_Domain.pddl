  (define
	(domain world-of-blocks)
	(:requirements :adl)
	(:predicates
		(on-top ?x ?y)
		(on-floor ?x)
		(clear ?x)
		(holding ?x)
		(not_holding)
	)
	; move the block ?x from the block ?z to the floor
	(:action putdown-to-floor
		:parameters (?x)
		:precondition
		(and
			(holding ?x)
			
		)
		:effect
		(and
			(not (holding ?x))
			(on-floor ?x)
			(clear ?x)
			(not_holding)
		)
	)
	
	(:action putdown-to-block ;put the holding x on top of y
		:parameters (?x ?y)
		:precondition
		(and
			(holding ?x)
			(clear ?y)
		)
		:effect
		(and
			(not (holding ?x))
			(on-top ?x ?y)
			(clear ?x)
			(not (clear ?y))
			(not_holding)
		)
	)
	; pickup-from-block and hold x
	(:action pickup-from-block
		:parameters (?x ?y)
		:precondition
		(and
			(clear ?x)
			(on-top ?x ?y)
			(not_holding)

		)
		:effect
		(and
			(holding ?x)
			(clear ?y)
			(not (clear ?x))
			(not (on-top ?x ?y))
			(not(not_holding))
		)
	)
	(:action pickup-from-floor ;pick-up from floor and hold x
		:parameters (?x)
		:precondition
		(and
			(clear ?x)
			(on-floor ?x)
    		(not_holding)

		)
		:effect
		(and
			(holding ?x)
			(not (clear ?x))
			(not (on-floor ?x))
			(not(not_holding))
		)
	)
)
