---
layout: default
title: Turtle Snowflakes
nav_order: 2
parent: Java with Greenfoot
permalink: /docs/java-greenfoot/turtle-snowflakes/
has_children: true
has_toc: true
---

# Turtle Snowflakes

```java
import greenfoot.*;  // (World, Actor, GreenfootImage, Greenfoot and MouseInfo)

/**
 * Write a description of class snowflake here.
 *
 * @author (your name)
 * @version (a version number or a date)
 */
public class snowflake extends Actor
{
    private void moveAndDraw(int distance)
    {
        //getWorld().getBackground().setColor(Color.GREEN);
        final int X_VECTOR = (int)(getX() + distance * Math.cos(Math.toRadians(getRotation())));
        final int Y_VECTOR = (int)(getY() + distance * Math.sin(Math.toRadians(getRotation())));
        getWorld().getBackground().drawLine(getX(), getY(), X_VECTOR, Y_VECTOR);
        move(distance);
    }
    private void setColor(int r, int g, int b)
    {
        getWorld().getBackground().setColor(new Color(r, g, b));
    }
    private void branch(int distance){
        for (int a = 0; a < 3; a++)
        {
            for (int b = 0; b < 3; b++)
            {
                moveAndDraw(distance);
                moveAndDraw(-distance);
                turn(45);
            }
            turn(-90);
            moveAndDraw(-distance);
            turn(-45);
        }
        turn(90);
        moveAndDraw(distance * 3);
    }
    public void act()
    {
        int r = 1;
        int g = 100;
        int b = 5;
        int[][] colors = { {85, 211, 136}, {197, 196, 126}, {235, 233, 166}, {25, 135, 222}, {211, 64, 159}, {159, 165, 106}, {178, 160, 125}, {36, 192, 70}, {231, 184, 204}, {63, 203, 219} };
        setColor(0,0,0);
        int randSize = (int)(Math.random()*25) + 5;
        for (int i = 0; i < 8; i++)
        {
            branch(randSize);
            turn(-45);
        }
    }  
}
```