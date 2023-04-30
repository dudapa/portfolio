from django.shortcuts import render


def snake(request):
    return render(request, 'games/snake/snake.html')

def breakout(request):
    return render(request, 'games/breakout/breakout.html')

def spacewar(request):
    return render(request, 'games/spacewar/spacewar.html')