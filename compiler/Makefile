CC      := g++
CFLAGS	:= -Ofast -c -std=c++11 -Wextra -Wall
LDFLAGS	:= -std=c++11 -Wextra -Wall
EXEC    := mech-lang

INC_DIR	:= inc
SRC_DIR	:= src
OBJ_DIR	:= obj
TMP_DIR := tmp
BIN_DIR := bin

GENSRC	:= $(TMP_DIR)/lex.yy.c $(TMP_DIR)/mech-lang.tab.c
GENOBJ	:= $(GENSRC:.c=.o)

vpath %.h ${INC_DIR}:${TMP_DIR}
vpath %.cpp ${SRC_DIR}:${TMP_DIR}
vpath %.obj ${OBJ_DIR}

run: Makefile $(BIN_DIR)/$(EXEC)

# $(BIN_DIR)/$(EXEC): $(TMP_DIR)/lex.yy.c
# 	$(CC) $(TMP_DIR)/lex.yy.c $(TMP_DIR)/mech-lang.tab.c -ll -o $(BIN_DIR)/$(EXEC)

$(BIN_DIR)/$(EXEC): $(GENOBJ)
	$(CC) $(LDFLAGS) -I${INC_DIR} $^ -o $(EXE)

$(GENOBJ): %.o: $(GENSRC)
	$(CC) -c -std=gnu++11 -I${INC_DIR} $< -o $@

# Use flex to generate lex.yy.c.
$(TMP_DIR)/lex.yy.c: mech-lang.l $(TMP_DIR)/mech-grammar.cpp
	flex mech-lang.l

# Use bison to generate mech-lang.tab.h used by Flex
$(TMP_DIR)/mech-grammar.cpp: mech-grammar.y parser.h
	bison -d mech-grammar.y --output=$@

clean:
	rm $(TMP_DIR)/* $(BIN_DIR)/*
